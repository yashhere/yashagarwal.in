import crypto from "crypto"
import fs from "fs"
import fsPromises from "fs/promises"
import path from "path"
import { glob } from "glob"
import matter from "gray-matter"
import OpenAI from "openai"

interface NoteFrontmatter {
  title?: string
  category?: string
  categories?: string | string[]
  tags?: string | string[]
  status?: string
  createdOn?: string
  updatedOn?: string
  _categorized?: string // Hash to track if content has been categorized
  [key: string]: any
}

interface NoteContent {
  file: string
  title: string
  excerpt: string
  currentCategory: string
  currentTags: string[]
}

interface CategorizationResult {
  file: string
  category: string
  tags: string[]
}

interface BatchResult {
  results: CategorizationResult[]
}

interface ProcessedFile {
  file: string
  contentHash: string
  category: string
  tags: string[]
  timestamp: string
}

interface ProcessingCache {
  version: string
  processedFiles: ProcessedFile[]
}

interface CategorizerConfig {
  apiKey: string
  baseURL?: string
  model?: string
  contentDir?: string
  maxTokensPerBatch?: number
  excerptLength?: number
  cacheFile?: string
  skipProcessed?: boolean
}

class NoteCategorizer {
  private client: OpenAI
  private contentDir: string
  private maxTokensPerBatch: number
  private excerptLength: number
  private model: string
  private cacheFile: string
  private skipProcessed: boolean
  private processingCache: ProcessingCache

  constructor(config: CategorizerConfig) {
    const {
      apiKey,
      baseURL,
      model = "gpt-4o-mini",
      contentDir = "content/notes",
      maxTokensPerBatch = 12000,
      excerptLength = 800,
      cacheFile = ".categorization-cache.json",
      skipProcessed = true,
    } = config

    this.client = new OpenAI({
      apiKey,
      ...(baseURL && { baseURL }),
    })

    this.contentDir = contentDir
    this.maxTokensPerBatch = maxTokensPerBatch
    this.excerptLength = excerptLength
    this.model = model
    this.cacheFile = cacheFile
    this.skipProcessed = skipProcessed
    this.processingCache = { version: "1.0", processedFiles: [] }
  }

  private generateContentHash(content: string, title: string): string {
    // Create hash based on content and title to detect changes
    return crypto
      .createHash("md5")
      .update(content + title)
      .digest("hex")
  }

  private async loadProcessingCache(): Promise<void> {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const cacheData = await fsPromises.readFile(this.cacheFile, "utf-8")
        this.processingCache = JSON.parse(cacheData)
      }
    } catch (error) {
      console.warn(`⚠️  Could not load processing cache: ${error}`)
      this.processingCache = { version: "1.0", processedFiles: [] }
    }
  }

  private async saveProcessingCache(): Promise<void> {
    try {
      await fsPromises.writeFile(
        this.cacheFile,
        JSON.stringify(this.processingCache, null, 2),
        "utf-8"
      )
    } catch (error) {
      console.error(`❌ Could not save processing cache: ${error}`)
    }
  }

  private isFileProcessed(filePath: string, contentHash: string): boolean {
    if (!this.skipProcessed) return false

    const relativePath = path.relative(this.contentDir, filePath)
    const processed = this.processingCache.processedFiles.find(
      (f) => f.file === relativePath && f.contentHash === contentHash
    )
    return !!processed
  }

  private addToProcessingCache(
    filePath: string,
    contentHash: string,
    category: string,
    tags: string[]
  ): void {
    const relativePath = path.relative(this.contentDir, filePath)

    // Remove existing entry if present
    this.processingCache.processedFiles =
      this.processingCache.processedFiles.filter((f) => f.file !== relativePath)

    // Add new entry
    this.processingCache.processedFiles.push({
      file: relativePath,
      contentHash,
      category,
      tags,
      timestamp: new Date().toISOString(),
    })
  }

  private extractFrontmatter(filePath: string): {
    frontmatter: NoteFrontmatter
    content: string
  } {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const parsed = matter(fileContent)
      return {
        frontmatter: parsed.data as NoteFrontmatter,
        content: parsed.content,
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error)
      return { frontmatter: {}, content: "" }
    }
  }

  private async getExistingCategoriesAndTags(): Promise<{
    categories: string[]
    tags: string[]
  }> {
    const categories = new Set<string>()
    const tags = new Set<string>()

    try {
      const mdxFiles = await glob(`${this.contentDir}/**/*.{md,mdx}`)

      for (const filePath of mdxFiles) {
        const { frontmatter } = this.extractFrontmatter(filePath)

        // Extract categories
        if (frontmatter.category) {
          categories.add(frontmatter.category)
        }
        if (frontmatter.categories) {
          if (Array.isArray(frontmatter.categories)) {
            frontmatter.categories.forEach((cat) => categories.add(cat))
          } else {
            categories.add(frontmatter.categories)
          }
        }

        // Extract tags
        if (frontmatter.tags) {
          if (Array.isArray(frontmatter.tags)) {
            frontmatter.tags.forEach((tag) => tags.add(tag))
          } else {
            tags.add(frontmatter.tags)
          }
        }
      }
    } catch (error) {
      console.error("Error collecting existing categories and tags:", error)
    }

    return {
      categories: Array.from(categories),
      tags: Array.from(tags),
    }
  }

  private async prepareNotesBatch(): Promise<{
    batches: string[][]
    skipped: string[]
  }> {
    const mdxFiles = await glob(`${this.contentDir}/**/*.{md,mdx}`)
    const batches: string[][] = []
    const skipped: string[] = []
    let currentBatch: string[] = []
    let currentTokens = 0

    console.log(`📂 Found ${mdxFiles.length} total files`)

    for (const filePath of mdxFiles) {
      try {
        const { frontmatter, content } = this.extractFrontmatter(filePath)

        // Skip unpublished notes
        if (frontmatter.status !== "published") {
          console.log(`⏭️  Skipping unpublished: ${path.basename(filePath)}`)
          skipped.push(filePath)
          continue
        }

        // Check if already processed
        const title =
          frontmatter.title || path.basename(filePath, path.extname(filePath))
        const contentHash = this.generateContentHash(content, title)

        if (this.isFileProcessed(filePath, contentHash)) {
          console.log(`✅ Already processed: ${path.basename(filePath)}`)
          skipped.push(filePath)
          continue
        }

        // Rough token estimation: 1 token ≈ 4 characters
        const fileTokens = Math.ceil(content.length / 4) + 200 // +200 for overhead

        if (
          currentTokens + fileTokens > this.maxTokensPerBatch &&
          currentBatch.length > 0
        ) {
          batches.push(currentBatch)
          currentBatch = [filePath]
          currentTokens = fileTokens
        } else {
          currentBatch.push(filePath)
          currentTokens += fileTokens
        }
      } catch (error) {
        console.error(`❌ Error processing ${path.basename(filePath)}:`, error)
        continue
      }
    }

    if (currentBatch.length > 0) {
      batches.push(currentBatch)
    }

    return { batches, skipped }
  }

  private async analyzeBatch(
    filePaths: string[],
    existingCategories: string[],
    existingTags: string[]
  ): Promise<BatchResult> {
    const batchContent: NoteContent[] = []

    for (const filePath of filePaths) {
      try {
        const { frontmatter, content } = this.extractFrontmatter(filePath)
        const title =
          frontmatter.title || path.basename(filePath, path.extname(filePath))

        // Get excerpt for analysis
        const excerpt =
          content.length > this.excerptLength
            ? content.substring(0, this.excerptLength) + "..."
            : content

        const currentTags = Array.isArray(frontmatter.tags)
          ? frontmatter.tags
          : frontmatter.tags
            ? [frontmatter.tags]
            : []

        batchContent.push({
          file: path.relative(this.contentDir, filePath),
          title,
          excerpt,
          currentCategory: frontmatter.category || "",
          currentTags,
        })
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
        continue
      }
    }

    const systemPrompt = `You are an expert content categorizer for a personal blog. Analyze the provided notes and assign:

1. ONE category per note (choose from existing categories when appropriate, create new ones sparingly)
2. 3-7 relevant tags per note (mix of existing and new tags as needed)

EXISTING CATEGORIES (${existingCategories.length}): ${existingCategories.join(", ")}
EXISTING TAGS (showing first 50): ${existingTags.slice(0, 50).join(", ")}

Guidelines:
- Keep total categories under 7 across ALL notes (reuse existing when possible)
- Categories should be broad themes like "Technology", "Personal", "Learning", "Career", "Travel", "Reviews"
- Tags should be specific and descriptive
- Strongly prefer existing categories/tags when they fit well
- For this personal blog, common categories might be: Technology, Personal, Career, Travel, Learning, Reviews
- Return JSON format only`

    const userPrompt = `Analyze these blog notes and provide categorization:

${JSON.stringify(batchContent, null, 2)}

Return ONLY a JSON object with this structure:
{
  "results": [
    {
      "file": "path/to/file.mdx",
      "category": "category_name",
      "tags": ["tag1", "tag2", "tag3"]
    }
  ]
}`

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        throw new Error("No response content from OpenAI")
      }

      return JSON.parse(content) as BatchResult
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      return { results: [] }
    }
  }

  private convertDateToIST(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return (
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
        .format(dateObj)
        .replace(", ", "T") + "+05:30"
    )
  }

  private async updateFileFrontmatter(
    filePath: string,
    category: string,
    tags: string[],
    contentHash: string
  ): Promise<void> {
    try {
      const fileContent = await fsPromises.readFile(filePath, "utf-8")
      const parsed = matter(fileContent)

      // Update category and tags
      parsed.data.category = category
      parsed.data.tags = tags.sort()

      // Convert createdOn from UTC to IST if it's in UTC format
      if (parsed.data.createdOn && typeof parsed.data.createdOn === "string") {
        // Check if the date is in UTC format (ends with 'Z' or '.000Z')
        if (parsed.data.createdOn.endsWith("Z")) {
          const createdDate = new Date(parsed.data.createdOn)
          if (!isNaN(createdDate.getTime())) {
            parsed.data.createdOn = this.convertDateToIST(createdDate)
            console.log(
              `   📅 Converted createdOn to IST for ${path.basename(filePath)}`
            )
          }
        }
      }

      // Update updatedOn timestamp
      parsed.data.updatedOn = this.convertDateToIST(new Date())

      // Add categorization hash to track processing
      parsed.data._categorized = contentHash

      // Reconstruct file
      const newContent = matter.stringify(parsed.content, parsed.data)

      // Write back to file
      await fsPromises.writeFile(filePath, newContent, "utf-8")

      console.log(
        `✓ Updated: ${path.basename(filePath)} → Category: ${category}, Tags: ${tags.length}`
      )

      // Add to processing cache
      this.addToProcessingCache(filePath, contentHash, category, tags)
    } catch (error) {
      console.error(`✗ Error updating ${path.basename(filePath)}:`, error)
    }
  }

  async categorizeAllNotes(dryRun: boolean = false): Promise<void> {
    console.log("🚀 Starting note categorization...")

    // Load processing cache
    await this.loadProcessingCache()
    console.log(
      `📋 Loaded cache with ${this.processingCache.processedFiles.length} previously processed files`
    )

    // Get existing categories and tags
    const { categories: existingCategories, tags: existingTags } =
      await this.getExistingCategoriesAndTags()

    console.log(
      `📊 Found ${existingCategories.length} existing categories, ${existingTags.length} existing tags`
    )
    console.log(`📁 Categories: ${existingCategories.join(", ")}`)

    // Prepare batches
    const { batches, skipped } = await this.prepareNotesBatch()

    if (skipped.length > 0) {
      console.log(
        `⏭️  Skipped ${skipped.length} files (unpublished or already processed)`
      )
    }

    if (batches.length === 0) {
      console.log("✨ All files are already processed!")
      return
    }

    console.log(
      `📦 Processing ${batches.length} batches with ${batches.reduce((acc, batch) => acc + batch.length, 0)} files...`
    )

    let updatedCategories = [...existingCategories]
    let updatedTags = [...existingTags]
    let newCategoriesCount = 0
    let newTagsCount = 0
    let totalProcessedFiles = 0

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      console.log(
        `\n🔄 Processing batch ${i + 1}/${batches.length} (${batch.length} files):`
      )

      // Show files being processed
      batch.forEach((filePath) => {
        console.log(`   📄 ${path.basename(filePath)}`)
      })

      // Analyze batch
      const batchResults = await this.analyzeBatch(
        batch,
        updatedCategories,
        updatedTags
      )

      if (batchResults.results && batchResults.results.length > 0) {
        // Track new categories and tags
        for (const result of batchResults.results) {
          if (!updatedCategories.includes(result.category)) {
            updatedCategories.push(result.category)
            newCategoriesCount++
            console.log(`➕ New category: ${result.category}`)
          }
          for (const tag of result.tags) {
            if (!updatedTags.includes(tag)) {
              updatedTags.push(tag)
              newTagsCount++
              console.log(`🏷️  New tag: ${tag}`)
            }
          }
        }

        // Write frontmatter immediately after batch processing
        if (!dryRun) {
          console.log(`📝 Writing changes for batch ${i + 1}...`)

          for (const result of batchResults.results) {
            const filePath = path.join(this.contentDir, result.file)
            try {
              await fsPromises.access(filePath)
              const { content } = this.extractFrontmatter(filePath)
              const title = result.file.replace(/\.mdx?$/, "")
              const contentHash = this.generateContentHash(content, title)

              await this.updateFileFrontmatter(
                filePath,
                result.category,
                result.tags,
                contentHash
              )
            } catch {
              console.error(`✗ File not found: ${path.basename(filePath)}`)
            }
          }

          // Save processing cache after each batch
          await this.saveProcessingCache()
          console.log(
            `💾 Cache updated with ${this.processingCache.processedFiles.length} entries`
          )
        } else {
          // In dry run mode, show what would be processed
          console.log(`🔍 Batch ${i + 1} results (DRY RUN):`)
          for (const result of batchResults.results) {
            console.log(
              `   📄 ${result.file} → ${result.category} | Tags: ${result.tags.join(", ")}`
            )
          }
        }

        totalProcessedFiles += batchResults.results.length
        console.log(
          `✅ Batch ${i + 1} completed: ${batchResults.results.length} files processed`
        )
      } else {
        console.log(`⚠️  Batch ${i + 1} returned no results`)
      }

      // Add small delay to respect rate limits
      if (i < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    // Final summary
    const finalCategories = new Set(updatedCategories)
    const finalTags = new Set(updatedTags)

    console.log("\n📈 Summary:")
    console.log(`📊 Total files processed: ${totalProcessedFiles}`)
    console.log(`➕ New categories added: ${newCategoriesCount}`)
    console.log(`🏷️  New tags added: ${newTagsCount}`)
    console.log(
      `📂 Final categories (${finalCategories.size}): ${Array.from(finalCategories).sort().join(", ")}`
    )
    console.log(`🏷️  Total unique tags: ${finalTags.size}`)

    if (finalCategories.size > 7) {
      console.log(
        `⚠️  Warning: More than 7 categories detected. Consider consolidating.`
      )
    }

    if (!dryRun) {
      console.log(
        `💾 Final cache contains ${this.processingCache.processedFiles.length} processed files`
      )
    }
  }

  // Method to clear processing cache
  async clearCache(): Promise<void> {
    try {
      if (fs.existsSync(this.cacheFile)) {
        await fsPromises.unlink(this.cacheFile)
        console.log("🗑️  Processing cache cleared")
      } else {
        console.log("📭 No cache file found")
      }
    } catch (error) {
      console.error(`❌ Error clearing cache: ${error}`)
    }
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2)

  const getArgValue = (flag: string): string | undefined => {
    const index = args.indexOf(flag)
    return index !== -1 && index < args.length - 1 ? args[index + 1] : undefined
  }

  const hasFlag = (flag: string): boolean => args.includes(flag)

  const apiKey = getArgValue("--api-key") || process.env.OPENAI_API_KEY
  const baseURL = getArgValue("--base-url")
  const model = getArgValue("--model") || "gpt-4o-mini"
  const contentDir = getArgValue("--content-dir") || "content/notes"
  const cacheFile = getArgValue("--cache-file") || ".categorization-cache.json"
  const dryRun = hasFlag("--dry-run")
  const clearCache = hasFlag("--clear-cache")
  const skipProcessed = !hasFlag("--no-skip-processed")
  const help = hasFlag("--help") || hasFlag("-h")

  if (help) {
    console.log(`
Usage: npx tsx categorize-notes.ts [options]

Options:
  --api-key <key>        OpenAI API key (or set OPENAI_API_KEY env var)
  --base-url <url>       Custom API base URL (for OpenAI-compatible APIs)
  --model <model>        Model to use (default: gpt-4o-mini)
  --content-dir <dir>    Content directory path (default: content/notes)
  --cache-file <file>    Cache file path (default: .categorization-cache.json)
  --dry-run              Show results without updating files
  --clear-cache          Clear the processing cache before running
  --no-skip-processed    Process all files even if already processed
  --help, -h             Show this help message

Examples:
  npx tsx categorize-notes.ts --api-key your-key --dry-run
  npx tsx categorize-notes.ts --clear-cache
  npx tsx categorize-notes.ts --no-skip-processed
  OPENAI_API_KEY=your-key npx tsx categorize-notes.ts
`)
    process.exit(0)
  }

  if (!apiKey) {
    console.error(
      "❌ Error: API key is required. Use --api-key or set OPENAI_API_KEY environment variable."
    )
    process.exit(1)
  }

  const config: CategorizerConfig = {
    apiKey,
    ...(baseURL && { baseURL }),
    model,
    contentDir,
    cacheFile,
    skipProcessed,
  }

  const categorizer = new NoteCategorizer(config)

  if (clearCache) {
    await categorizer.clearCache()
    if (args.length === 1) {
      // Only clear cache flag provided
      process.exit(0)
    }
  }

  await categorizer.categorizeAllNotes(dryRun)
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Fatal error:", error)
    process.exit(1)
  })
}

export { NoteCategorizer }
