#!/usr/bin/env bun
import fs from "fs/promises"
import path from "path"
import readline from "readline"
import { glob } from "glob"

interface NoteFrontmatter {
  title: string
  createdOn: string
  status: "draft" | "published"
  series?: {
    order: number
    title: string
  }
  tags?: string[]
  description?: string
  category?: string
  image?: string
}

class NoteCreator {
  private rl: readline.Interface
  private contentDir: string

  constructor(contentDir: string = "content/notes") {
    this.contentDir = contentDir
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  private async question(query: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(query, resolve)
    })
  }

  private async confirm(query: string): Promise<boolean> {
    const answer = await this.question(`${query} (y/N): `)
    return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
  }

  private createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  private formatDateTime(date: Date): string {
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
        .format(date)
        .replace(", ", "T") + "+05:30"
    )
  }

  private async getExistingData(): Promise<{
    categories: string[]
    tags: string[]
    series: Array<{ title: string; maxOrder: number }>
  }> {
    const categories = new Set<string>()
    const tags = new Set<string>()
    const seriesMap = new Map<string, number>()

    try {
      const mdxFiles = await glob(`${this.contentDir}/**/*.{md,mdx}`)

      for (const filePath of mdxFiles) {
        try {
          const content = await fs.readFile(filePath, "utf-8")
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

          if (frontmatterMatch) {
            const frontmatterText = frontmatterMatch[1]

            // Extract category
            const categoryMatch = frontmatterText.match(/^category:\s*(.+)$/m)
            if (categoryMatch) {
              categories.add(categoryMatch[1].trim())
            }

            // Extract tags
            const tagsMatch = frontmatterText.match(
              /^tags:\s*\n((?:\s*-\s*.+\n?)*)/m
            )
            if (tagsMatch) {
              const tagLines = tagsMatch[1].split("\n")
              tagLines.forEach((line) => {
                const tagMatch = line.match(/^\s*-\s*(.+)$/)
                if (tagMatch) {
                  tags.add(tagMatch[1].trim())
                }
              })
            }

            // Extract series
            const seriesMatch = frontmatterText.match(
              /^series:\s*\n\s*order:\s*(\d+)\s*\n\s*title:\s*(.+)$/m
            )
            if (seriesMatch) {
              const order = parseInt(seriesMatch[1])
              const title = seriesMatch[2].trim()
              const currentMax = seriesMap.get(title) || 0
              seriesMap.set(title, Math.max(currentMax, order))
            }
          }
        } catch (error) {
          // Skip files that can't be read
          continue
        }
      }
    } catch (error) {
      console.error("Warning: Could not analyze existing content:", error)
    }

    return {
      categories: Array.from(categories).sort(),
      tags: Array.from(tags).sort(),
      series: Array.from(seriesMap.entries()).map(([title, maxOrder]) => ({
        title,
        maxOrder,
      })),
    }
  }

  private async fileExists(filename: string): Promise<boolean> {
    try {
      await fs.access(path.join(this.contentDir, filename))
      return true
    } catch {
      return false
    }
  }

  private displayWelcome(): void {
    console.log("\n" + "=".repeat(60))
    console.log("📝 CREATE NEW NOTE")
    console.log("=".repeat(60))
    console.log("✨ Let's create something amazing together!")
    console.log("")
  }

  private displaySection(title: string): void {
    console.log(`\n${"─".repeat(40)}`)
    console.log(`📋 ${title.toUpperCase()}`)
    console.log(`${"─".repeat(40)}`)
  }

  private async searchableSelect(
    prompt: string,
    options: string[]
  ): Promise<string> {
    if (options.length === 0) {
      return await this.question(`${prompt}: `)
    }

    console.log(`\n${prompt}`)
    if (options.length > 0) {
      console.log("💡 Available options:")
      options.forEach((option, index) => {
        console.log(`   ${index + 1}. ${option}`)
      })
      console.log("")
    }

    const answer = await this.question(
      "📂 Enter category name (or number from list above): "
    )

    // Check if user entered a number
    const num = parseInt(answer.trim())
    if (!isNaN(num) && num > 0 && num <= options.length) {
      return options[num - 1]
    }

    // Return the text as-is (new category or typed name)
    return answer.trim()
  }

  private async multiSelect(
    prompt: string,
    options: string[],
    maxSelections: number = 5
  ): Promise<string[]> {
    console.log(`\n${prompt}`)

    if (options.length === 0) {
      console.log("💡 No existing tags found. Enter tags manually:")
      const tags: string[] = []
      let tagInput = ""
      do {
        tagInput = await this.question(
          `   Tag ${tags.length + 1} (empty to finish): `
        )
        if (tagInput.trim()) {
          tags.push(tagInput.trim())
        }
      } while (tagInput.trim() && tags.length < maxSelections)
      return tags
    }

    console.log("💡 Available tags:")
    options.forEach((option, index) => {
      console.log(`   ${index + 1}. ${option}`)
    })
    console.log("")
    console.log(
      `💡 Select up to ${maxSelections} tags by entering numbers (comma-separated) or tag names:`
    )
    console.log("   Example: 1,3,5 or Blog Setup,Next.js,New Tag")

    const answer = await this.question("🏷️  Your selection: ")

    if (!answer.trim()) {
      return []
    }

    const selections: string[] = []
    const parts = answer.split(",").map((part) => part.trim())

    for (const part of parts) {
      if (selections.length >= maxSelections) break

      const num = parseInt(part)
      if (!isNaN(num) && num > 0 && num <= options.length) {
        // It's a valid number, add the corresponding tag
        const tag = options[num - 1]
        if (!selections.includes(tag)) {
          selections.push(tag)
        }
      } else if (part) {
        // It's a tag name (new or existing)
        if (!selections.includes(part)) {
          selections.push(part)
        }
      }
    }

    return selections
  }

  async createNote(): Promise<void> {
    try {
      this.displayWelcome()

      // Get existing data for suggestions
      console.log("🔍 Analyzing existing content...")
      const { categories, tags, series } = await this.getExistingData()

      this.displaySection("Basic Information")

      // Title (required)
      let title = ""
      while (!title.trim()) {
        title = await this.question("📝 Title (required): ")
        if (!title.trim()) {
          console.log("❌ Title is required!")
        }
      }

      // Generate and validate filename
      const baseSlug = this.createSlug(title)
      let filename = `${baseSlug}.mdx`
      let counter = 1

      while (await this.fileExists(filename)) {
        filename = `${baseSlug}-${counter}.mdx`
        counter++
      }

      if (counter > 1) {
        console.log(`📁 File will be created as: ${filename}`)
      }

      // Description (optional)
      const description = await this.question("📖 Description (optional): ")

      this.displaySection("Categorization")

      // Category with search
      console.log("")
      const category = await this.searchableSelect("📂 Category", categories)

      // Tags with multi-select
      console.log("")
      const tagsList = await this.multiSelect("🏷️  Tags", tags, 5)

      this.displaySection("Series (Optional)")

      // Series
      let seriesInfo: { order: number; title: string } | undefined

      if (series.length > 0) {
        console.log("📚 Existing series:")
        series.forEach((s, i) => {
          console.log(`   ${i + 1}. ${s.title} (${s.maxOrder} parts)`)
        })
      }

      const addToSeries = await this.confirm("📚 Add to a series?")

      if (addToSeries) {
        const seriesTitle = await this.question("📚 Series title: ")
        if (seriesTitle.trim()) {
          const existingSeries = series.find(
            (s) => s.title.toLowerCase() === seriesTitle.toLowerCase()
          )
          const nextOrder = existingSeries ? existingSeries.maxOrder + 1 : 1

          const orderInput = await this.question(
            `📊 Order in series (default: ${nextOrder}): `
          )
          const order = orderInput.trim() ? parseInt(orderInput) : nextOrder

          if (!isNaN(order)) {
            seriesInfo = { order, title: seriesTitle.trim() }
          }
        }
      }

      this.displaySection("Advanced Options")

      // Image
      const image = await this.question("🖼️  Image path (optional): ")

      // Create frontmatter
      const frontmatter: NoteFrontmatter = {
        title,
        createdOn: this.formatDateTime(new Date()),
        status: "draft",
      }

      if (seriesInfo) {
        frontmatter.series = seriesInfo
      }

      if (tagsList.length > 0) {
        frontmatter.tags = tagsList.sort()
      }

      if (description.trim()) {
        frontmatter.description = description.trim()
      }

      if (category.trim()) {
        frontmatter.category = category.trim()
      }

      if (image.trim()) {
        frontmatter.image = image.trim()
      }

      // Create file content
      let fileContent = "---\n"

      // Add frontmatter fields in specific order
      fileContent += `title: ${JSON.stringify(frontmatter.title)}\n`
      fileContent += `createdOn: ${JSON.stringify(frontmatter.createdOn)}\n`
      fileContent += `status: ${frontmatter.status}\n`

      if (frontmatter.series) {
        fileContent += `series:\n`
        fileContent += `  order: ${frontmatter.series.order}\n`
        fileContent += `  title: ${frontmatter.series.title}\n`
      }

      if (frontmatter.tags && frontmatter.tags.length > 0) {
        fileContent += `tags:\n`
        frontmatter.tags.forEach((tag) => {
          fileContent += `  - ${tag}\n`
        })
      }

      if (frontmatter.description) {
        fileContent += `description: >\n`
        fileContent += `  ${frontmatter.description}\n`
      }

      if (frontmatter.category) {
        fileContent += `category: ${frontmatter.category}\n`
      }

      if (frontmatter.image) {
        fileContent += `image: ${frontmatter.image}\n`
      }

      fileContent += "---\n\n"
      fileContent += "# Introduction\n\n"
      fileContent += "Write your content here...\n"

      // Display preview
      this.displaySection("Preview")
      console.log("📄 File preview:")
      console.log("─".repeat(40))
      console.log(fileContent)
      console.log("─".repeat(40))

      // Confirm creation
      const shouldCreate = await this.confirm("✅ Create this note?")

      if (shouldCreate) {
        const filePath = path.join(this.contentDir, filename)
        await fs.writeFile(filePath, fileContent, "utf-8")

        console.log("\n" + "=".repeat(60))
        console.log("🎉 SUCCESS!")
        console.log("=".repeat(60))
        console.log(`📝 Note created: ${filePath}`)
        console.log(`🚀 Ready to start writing!`)
        console.log("")
        console.log("💡 Next steps:")
        console.log("   • Open the file in your editor")
        console.log("   • Write your amazing content")
        console.log("   • Change status to 'published' when ready")
        console.log("")
      } else {
        console.log("❌ Note creation cancelled.")
      }
    } catch (error) {
      console.error("❌ Error creating note:", error)
    } finally {
      this.rl.close()
    }
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2)
  const help = args.includes("--help") || args.includes("-h")

  if (help) {
    console.log(`
📝 Create Note Script

Usage: bun scripts/create-note.ts [options]

Options:
  --help, -h    Show this help message

Features:
  ✨ Interactive prompts with modern aesthetics
  📂 Auto-suggests existing categories and tags
  📚 Series support with automatic ordering
  🔄 Automatic filename generation and conflict resolution
  ⏰ IST timezone support
  📋 Live preview before creation
  🎯 Smart defaults (draft status, featured: false)

Examples:
  bun scripts/create-note.ts
  npm run create-note
`)
    process.exit(0)
  }

  const contentDir = process.env.CONTENT_DIR || "content/notes"
  const creator = new NoteCreator(contentDir)
  await creator.createNote()
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Fatal error:", error)
    process.exit(1)
  })
}

export { NoteCreator }
