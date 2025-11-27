#!/usr/bin/env bun
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs"
import { extname, join } from "path"

const CONTENT_DIR = join(process.cwd(), "content")

interface UpdateStats {
  filesProcessed: number
  filesUpdated: number
  totalReplacements: number
}

class ImageRefUpdater {
  private stats: UpdateStats = {
    filesProcessed: 0,
    filesUpdated: 0,
    totalReplacements: 0,
  }

  updateDirectory(dirPath: string) {
    const files = readdirSync(dirPath)

    for (const file of files) {
      const filePath = join(dirPath, file)
      const stat = statSync(filePath)

      if (stat.isDirectory()) {
        this.updateDirectory(filePath)
      } else if (extname(file).toLowerCase() === ".mdx") {
        this.updateMdxFile(filePath)
      }
    }
  }

  private updateMdxFile(filePath: string) {
    this.stats.filesProcessed++
    const content = readFileSync(filePath, "utf-8")
    let updated = content
    let replacements = 0

    // Update frontmatter image references
    updated = updated.replace(
      /^image:\s*(.+\.(jpg|jpeg|png))$/gm,
      (_match, path) => {
        replacements++
        return `image: ${path.replace(/\.(jpg|jpeg|png)$/i, ".webp")}`
      }
    )

    // Update markdown image syntax: ![alt](/path/to/image.jpg "title")
    updated = updated.replace(
      /!\[([^\]]*)\]\(([^)]+\.(jpg|jpeg|png))(\s+"[^"]*")?\)/gi,
      (_match, alt, path, _ext, title) => {
        replacements++
        const newPath = path.replace(/\.(jpg|jpeg|png)$/i, ".webp")
        return `![${alt}](${newPath}${title || ""})`
      }
    )

    if (replacements > 0) {
      writeFileSync(filePath, updated, "utf-8")
      this.stats.filesUpdated++
      this.stats.totalReplacements += replacements
      console.log(`✅ ${filePath}: ${replacements} image references updated`)
    }
  }

  printSummary() {
    console.log("\n" + "=".repeat(60))
    console.log("📊 IMAGE REFERENCE UPDATE SUMMARY")
    console.log("=".repeat(60))
    console.log(`Total MDX files processed: ${this.stats.filesProcessed}`)
    console.log(`Files updated: ${this.stats.filesUpdated}`)
    console.log(
      `Total image references updated: ${this.stats.totalReplacements}`
    )
    console.log("=".repeat(60))
  }
}

async function main() {
  console.log("🚀 Updating image references in MDX files...\n")

  const updater = new ImageRefUpdater()
  updater.updateDirectory(CONTENT_DIR)
  updater.printSummary()

  console.log("\n✨ Image reference update complete!")
}

main().catch(console.error)
