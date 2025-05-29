# Note Categorization System

Automatically categorize and tag your blog notes using OpenAI API with efficient token usage and context awareness.

## Features

- **Smart Categorization**: Uses OpenAI API to analyze notes and assign consistent categories (max 5-7 across all notes)
- **Intelligent Tagging**: Assigns 3-7 relevant tags per note based on content analysis
- **Context Awareness**: Considers existing categories and tags to maintain consistency
- **Efficient Processing**: Batches notes to optimize token usage and API costs
- **OpenAI-Compatible APIs**: Supports custom base URLs for alternative providers
- **IST Timezone Support**: Automatically handles Indian Standard Time for timestamps
- **Dry Run Mode**: Preview changes before applying them
- **Type-Safe**: Written in TypeScript with comprehensive error handling

## Installation

Install the required dependencies:

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

## Usage

### Quick Start

1. **Set your API key** (choose one method):

   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

   Or use the `--api-key` flag when running commands.

2. **Run a dry run first** to preview changes:

   ```bash
   # Using npm scripts
   npm run categorize:dry

   # Or directly with tsx
   npx tsx scripts/categorize-notes.ts --dry-run

   # Or using the shell wrapper
   bash scripts/categorize.sh --dry-run
   ```

3. **Apply the changes**:
   ```bash
   npm run categorize
   ```

### Advanced Usage

#### Using Alternative OpenAI-Compatible APIs

```bash
# Example with DeepInfra
npx tsx scripts/categorize-notes.ts \
  --base-url "https://api.deepinfra.com/v1/openai" \
  --model "meta-llama/Meta-Llama-3.1-70B-Instruct" \
  --api-key "your-deepinfra-key"

# Example with OpenRouter
npx tsx scripts/categorize-notes.ts \
  --base-url "https://openrouter.ai/api/v1" \
  --model "anthropic/claude-3-haiku" \
  --api-key "your-openrouter-key"
```

#### Custom Content Directory

```bash
npx tsx scripts/categorize-notes.ts \
  --content-dir "content/posts" \
  --dry-run
```

#### Full Command Options

```bash
npx tsx scripts/categorize-notes.ts \
  --api-key "your-key" \
  --base-url "https://api.openai.com/v1" \
  --model "gpt-4o-mini" \
  --content-dir "content/notes" \
  --dry-run
```

### Shell Script Wrapper

The `categorize.sh` script provides a convenient wrapper with colored output:

```bash
# Make executable (may need to run this once)
chmod +x scripts/categorize.sh

# Show help
./scripts/categorize.sh --help

# Basic usage
./scripts/categorize.sh --api-key "your-key" --dry-run

# With custom provider
./scripts/categorize.sh \
  --base-url "https://api.deepinfra.com/v1/openai" \
  --model "meta-llama/Meta-Llama-3.1-70B-Instruct" \
  --api-key "your-key"
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required if not passed via `--api-key`)

### Command Line Options

| Option          | Description             | Default           |
| --------------- | ----------------------- | ----------------- |
| `--api-key`     | OpenAI API key          | `$OPENAI_API_KEY` |
| `--base-url`    | Custom API base URL     | OpenAI's default  |
| `--model`       | Model to use            | `gpt-4o-mini`     |
| `--content-dir` | Content directory path  | `content/notes`   |
| `--dry-run`     | Preview without changes | `false`           |
| `--help`        | Show help message       | -                 |

### Supported Models

The script works with any OpenAI-compatible model. Popular choices:

**OpenAI Models:**

- `gpt-4o-mini` (recommended for cost efficiency)
- `gpt-4o`
- `gpt-3.5-turbo`

**Alternative Providers:**

- **DeepInfra**: `meta-llama/Meta-Llama-3.1-70B-Instruct`
- **OpenRouter**: `anthropic/claude-3-haiku`
- **Together AI**: `meta-llama/Llama-2-70b-chat-hf`

## How It Works

1. **Discovery**: Scans your content directory for `.md` and `.mdx` files
2. **Analysis**: Extracts existing categories and tags for context
3. **Batching**: Groups notes into efficient batches to optimize token usage
4. **Processing**: Sends batches to OpenAI API for analysis
5. **Categorization**: AI assigns one category and 3-7 tags per note
6. **Updating**: Updates frontmatter with new categories, tags, and `updatedOn` timestamp

### Categorization Strategy

The AI follows these guidelines:

- **Categories**: Broad themes like "Technology", "Personal", "Career", "Travel", "Learning", "Reviews"
- **Tags**: Specific and descriptive keywords
- **Consistency**: Strongly prefers existing categories/tags when they fit
- **Limit**: Keeps total categories under 7 across all notes
- **Context**: Considers the Indian author context for cultural relevance

## File Structure

```
scripts/
├── categorize-notes.ts     # Main TypeScript categorization script
├── categorize.sh          # Shell wrapper with colored output
└── update-frontmatter.ts  # Fixed frontmatter update utility
```

## Example Output

```
🚀 Starting note categorization...
📊 Found 3 existing categories, 15 existing tags
📁 Categories: Technology, Personal, Travel

📦 Processing 2 batches...

🔄 Processing batch 1/2 (5 files)...
➕ New category: Learning

🔄 Processing batch 2/2 (3 files)...

📝 Applying changes...
✓ Updated: how-i-built-a-blog-with-nextjs.mdx
✓ Updated: 2022-the-year-of-plentiful.mdx
✓ Updated: thailand-sandy-beaches-to-bustling-streets.mdx

📈 Summary:
📊 Total files processed: 8
📂 Final categories (4): Learning, Personal, Technology, Travel
🏷️  Total unique tags: 24
```

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your API key is set correctly

   ```bash
   echo $OPENAI_API_KEY  # Should show your key
   ```

2. **Permission Denied**: Make the shell script executable

   ```bash
   chmod +x scripts/categorize.sh
   ```

3. **Rate Limiting**: The script includes automatic delays between batches

4. **Token Limits**: Adjust `maxTokensPerBatch` in the script if needed

### Cost Optimization

- Use `gpt-4o-mini` for best cost efficiency
- The script batches requests to minimize API calls
- Only published notes are processed
- Consider using alternative providers for even lower costs

## Related Scripts

### Update Frontmatter

Fixed version of the frontmatter update utility:

```bash
# Update specific files
npm run update-frontmatter content/notes/example.mdx

# Or directly
npx tsx scripts/update-frontmatter.ts content/notes/example.mdx
```

This script:

- Converts dates to IST timezone format
- Adds `updatedOn` timestamps
- Only processes published notes after the cutoff date
- Includes proper error handling and async/await

## Contributing

The categorization system is designed to be extensible. Key areas for enhancement:

- Custom categorization rules
- Different prompt strategies
- Integration with other AI providers
- Batch size optimization
- Custom output formats

## License

This is part of the yashagarwal.in blog system.
