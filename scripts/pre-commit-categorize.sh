#!/bin/bash

# Pre-commit categorization script
# This script runs the categorization tool and handles API key validation

set -e

# Check if API key is available
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  Warning: OPENAI_API_KEY not found. Skipping categorization."
    echo "   Set OPENAI_API_KEY environment variable to enable automatic categorization."
    exit 0
fi

echo "🤖 Running automatic note categorization..."

# Run categorization script
tsx scripts/categorize-notes.ts --content-dir content/notes --skip-processed

# Check if categorization created any changes
if [ -n "$(git diff --name-only content/notes)" ]; then
    echo "✅ Categorization complete. Adding updated files to staging area..."
    git add content/notes
else
    echo "✅ No categorization changes needed."
fi
