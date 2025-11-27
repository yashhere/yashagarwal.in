#!/usr/bin/env bun
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
} from "fs"
import { basename, dirname, extname, join, relative } from "path"
import sharp from "sharp"

interface ImageStats {
  path: string
  originalSize: number
  optimizedSize: number
  savings: number
  savingsPercent: number
}

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"]
const WEBP_QUALITY_HIGH = 90 // High quality for git storage
const WEBP_QUALITY_COMPRESSED = 82 // For large files that need compression
const LARGE_FILE_THRESHOLD = 500 * 1024 // 500KB

class ImageOptimizer {
  private stats: ImageStats[] = []
  private totalOriginalSize = 0
  private totalOptimizedSize = 0
  private backupDir = ".originals"

  async optimizeDirectory(dirPath: string, outputDir?: string) {
    const targetDir = outputDir || dirPath
    const files = readdirSync(dirPath)

    for (const file of files) {
      const filePath = join(dirPath, file)
      const stat = statSync(filePath)

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        const newOutputDir = outputDir
          ? join(outputDir, file)
          : join(dirPath, file)
        await this.optimizeDirectory(filePath, newOutputDir)
      } else if (this.isImageFile(file)) {
        await this.optimizeImage(filePath, targetDir)
      }
    }
  }

  private isImageFile(filename: string): boolean {
    const ext = extname(filename).toLowerCase()
    return IMAGE_EXTENSIONS.includes(ext)
  }

  private async optimizeImage(inputPath: string, outputDir: string) {
    try {
      const ext = extname(inputPath).toLowerCase()
      const fileName = basename(inputPath, ext)
      const outputPath = join(outputDir, `${fileName}.webp`)

      // Skip if WebP version already exists
      if (existsSync(outputPath)) {
        console.log(
          `⏭️  Skipping ${relative(process.cwd(), inputPath)} (WebP already exists)`
        )
        return
      }

      // Get original file size
      const originalSize = statSync(inputPath).size

      // Create backup of original
      await this.backupOriginal(inputPath)

      // Ensure output directory exists
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      // Determine quality based on file size
      const quality =
        originalSize > LARGE_FILE_THRESHOLD
          ? WEBP_QUALITY_COMPRESSED
          : WEBP_QUALITY_HIGH

      const compressionType =
        originalSize > LARGE_FILE_THRESHOLD ? "compressed" : "converted"

      // Convert/Optimize to WebP
      const image = sharp(inputPath)

      await image
        .webp({
          quality,
          effort: 6, // 0-6, higher = better compression but slower
        })
        .toFile(outputPath)

      // Get optimized file size
      const optimizedSize = statSync(outputPath).size
      const savings = originalSize - optimizedSize
      const savingsPercent = (savings / originalSize) * 100

      // Track statistics
      this.stats.push({
        path: inputPath,
        originalSize,
        optimizedSize,
        savings,
        savingsPercent,
      })

      this.totalOriginalSize += originalSize
      this.totalOptimizedSize += optimizedSize

      console.log(
        `✅ ${relative(process.cwd(), inputPath)} [${compressionType}]\n   ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)} (${savingsPercent.toFixed(1)}% savings, quality: ${quality})`
      )

      // Delete the original file after successful conversion
      unlinkSync(inputPath)
      console.log(`   🗑️  Deleted original ${ext} file`)
    } catch (error) {
      console.error(`❌ Error optimizing ${inputPath}:`, error)
    }
  }

  private async backupOriginal(filePath: string) {
    const publicDir = join(process.cwd(), "public")
    const relativePath = relative(publicDir, filePath)
    const backupPath = join(publicDir, this.backupDir, relativePath)
    const backupDirPath = dirname(backupPath)

    // Create backup directory if it doesn't exist
    if (!existsSync(backupDirPath)) {
      mkdirSync(backupDirPath, { recursive: true })
    }

    // Copy original to backup location if not already backed up
    if (!existsSync(backupPath)) {
      copyFileSync(filePath, backupPath)
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  printSummary() {
    console.log("\n" + "=".repeat(60))
    console.log("📊 OPTIMIZATION SUMMARY")
    console.log("=".repeat(60))
    console.log(`Total files processed: ${this.stats.length}`)
    console.log(
      `Original total size: ${this.formatBytes(this.totalOriginalSize)}`
    )
    console.log(
      `Optimized total size: ${this.formatBytes(this.totalOptimizedSize)}`
    )
    console.log(
      `Total savings: ${this.formatBytes(this.totalOriginalSize - this.totalOptimizedSize)} (${(((this.totalOriginalSize - this.totalOptimizedSize) / this.totalOriginalSize) * 100).toFixed(1)}%)`
    )
    console.log("=".repeat(60))

    // Show top 10 files by savings
    console.log("\n🏆 Top 10 files by size reduction:")
    const topSavings = [...this.stats]
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 10)

    topSavings.forEach((stat, index) => {
      console.log(
        `${index + 1}. ${relative(process.cwd(), stat.path)}\n   Saved: ${this.formatBytes(stat.savings)} (${stat.savingsPercent.toFixed(1)}%)`
      )
    })

    console.log(`\n💾 Original images backed up to: public/${this.backupDir}/`)
    console.log(
      `\n⚠️  Note: Original JPG/PNG files have been deleted. Only WebP versions remain.`
    )
  }
}

// Main execution
async function main() {
  const imagesDir = join(process.cwd(), "public", "images")

  if (!existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`)
    process.exit(1)
  }

  console.log("🚀 Starting image optimization...")
  console.log(`📁 Processing: ${imagesDir}`)
  console.log(`📏 Large file threshold: ${LARGE_FILE_THRESHOLD / 1024}KB`)
  console.log(
    `🎨 Quality: ${WEBP_QUALITY_COMPRESSED} (large), ${WEBP_QUALITY_HIGH} (small)\n`
  )

  const optimizer = new ImageOptimizer()
  await optimizer.optimizeDirectory(imagesDir)
  optimizer.printSummary()

  console.log("\n✨ Image optimization complete!")
  console.log("\n📝 Next step: Run the update-refs script to update MDX files")
}

main().catch(console.error)
