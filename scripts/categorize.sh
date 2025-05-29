#!/bin/bash

# Note Categorization Script
# Automatically categorize and tag your blog notes using OpenAI API

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
DRY_RUN=false
CONTENT_DIR="content/notes"
MODEL="gpt-4o-mini"

# Function to display help
show_help() {
    echo -e "${BLUE}Note Categorization Script${NC}"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -k, --api-key <key>     OpenAI API key (or set OPENAI_API_KEY env var)"
    echo "  -u, --base-url <url>    Custom API base URL (for OpenAI-compatible APIs)"
    echo "  -m, --model <model>     Model to use (default: gpt-4o-mini)"
    echo "  -d, --content-dir <dir> Content directory path (default: content/notes)"
    echo "  -n, --dry-run          Show results without updating files"
    echo "  -h, --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --api-key your-key --dry-run"
    echo "  $0 --base-url https://api.deepinfra.com/v1/openai --model meta-llama/Meta-Llama-3.1-70B-Instruct"
    echo "  OPENAI_API_KEY=your-key $0"
    echo ""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -k|--api-key)
            API_KEY="$2"
            shift 2
        ;;
        -u|--base-url)
            BASE_URL="$2"
            shift 2
        ;;
        -m|--model)
            MODEL="$2"
            shift 2
        ;;
        -d|--content-dir)
            CONTENT_DIR="$2"
            shift 2
        ;;
        -n|--dry-run)
            DRY_RUN=true
            shift
        ;;
        -h|--help)
            show_help
            exit 0
        ;;
        *)
            echo -e "${RED}Error: Unknown option $1${NC}"
            show_help
            exit 1
        ;;
    esac
done

# Check for API key
if [[ -z "${API_KEY}" && -z "${OPENAI_API_KEY}" ]]; then
    echo -e "${RED}Error: API key is required. Use --api-key option or set OPENAI_API_KEY environment variable.${NC}"
    exit 1
fi

# Use provided API key or fall back to environment variable
FINAL_API_KEY="${API_KEY:-$OPENAI_API_KEY}"

echo -e "${BLUE}🚀 Starting Note Categorization${NC}"
echo -e "${YELLOW}📁 Content Directory: ${CONTENT_DIR}${NC}"
echo -e "${YELLOW}🤖 Model: ${MODEL}${NC}"

if [[ "${DRY_RUN}" == "true" ]]; then
    echo -e "${YELLOW}🔍 Dry Run Mode: No files will be modified${NC}"
fi

if [[ -n "${BASE_URL}" ]]; then
    echo -e "${YELLOW}🌐 Base URL: ${BASE_URL}${NC}"
fi

echo ""

# Install dependencies if needed
if ! command -v bun &> /dev/null; then
    echo -e "${YELLOW}Installing dependencies with npm...${NC}"
    npm install
else
    echo -e "${YELLOW}Installing dependencies with bun...${NC}"
    bun install
fi

# Build the command
CMD_ARGS=("--api-key" "$FINAL_API_KEY" "--content-dir" "$CONTENT_DIR" "--model" "$MODEL")

if [[ -n "${BASE_URL}" ]]; then
    CMD_ARGS+=("--base-url" "$BASE_URL")
fi

if [[ "${DRY_RUN}" == "true" ]]; then
    CMD_ARGS+=("--dry-run")
fi

# Run the categorization script
echo -e "${GREEN}Running categorization script...${NC}"
if command -v bun &> /dev/null; then
    bunx tsx scripts/categorize-notes.ts "${CMD_ARGS[@]}"
else
    npx tsx scripts/categorize-notes.ts "${CMD_ARGS[@]}"
fi

echo -e "${GREEN}✅ Categorization completed!${NC}"
