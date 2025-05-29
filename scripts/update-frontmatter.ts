import fs from "fs/promises"
import matter from "gray-matter"

// the date when I added this functionality
const CUTOFF_DATE = "2023-07-26"

function convertDateToIST(date: Date | string): string {
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

const updateFrontmatter = async (): Promise<void> => {
  const [, , ...mdFilePaths] = process.argv

  if (mdFilePaths.length === 0) {
    console.error("❌ Error: Please provide at least one markdown file path.")
    console.log(
      "Usage: npx tsx update-frontmatter.ts <file1.mdx> [file2.mdx] ..."
    )
    process.exit(1)
  }

  console.log(`🚀 Processing ${mdFilePaths.length} files...`)

  // Use Promise.all instead of forEach for proper async handling
  const updatePromises = mdFilePaths.map(async (filePath) => {
    try {
      // Check if file exists
      await fs.access(filePath)

      const fileContent = await fs.readFile(filePath, "utf-8")
      const file = matter(fileContent)
      const { data: currentFrontmatter } = file

      if (currentFrontmatter.status === "published") {
        // If createdOn is not present, set it to current time, else ignore
        if (!currentFrontmatter.createdOn) {
          console.log(`⚠️  No createdOn found in ${filePath}, skipping...`)
          return
        }

        const publishedDate = new Date(currentFrontmatter.createdOn)
        const cutoffDate = new Date(CUTOFF_DATE)

        if (isNaN(publishedDate.getTime())) {
          console.error(
            `❌ Invalid date in ${filePath}: ${currentFrontmatter.createdOn}`
          )
          return
        }

        if (publishedDate >= cutoffDate) {
          const updatedFrontmatter = {
            ...currentFrontmatter,
            createdOn: convertDateToIST(publishedDate),
            updatedOn: convertDateToIST(new Date()),
          }

          file.data = updatedFrontmatter
          const updatedFileContent = matter.stringify(file.content, file.data)
          await fs.writeFile(filePath, updatedFileContent, "utf-8")

          console.log(`✓ Updated: ${filePath}`)
        } else {
          console.log(`⏭️  Skipped (before cutoff): ${filePath}`)
        }
      } else {
        console.log(`⏭️  Skipped (not published): ${filePath}`)
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error)
    }
  })

  await Promise.all(updatePromises)
  console.log("✅ Frontmatter update completed!")
}

updateFrontmatter().catch((error) => {
  console.error("❌ Fatal error:", error)
  process.exit(1)
})
