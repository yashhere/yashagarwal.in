/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs").promises
const matter = require("gray-matter")

const CUTOFF_DATE = "2023-07-26"
const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file

    if (currentFrontmatter.status === "published") {
      const publishedDate = new Date(currentFrontmatter.published)
      const cutoffDate = new Date(CUTOFF_DATE)
      if (publishedDate >= cutoffDate) {
        const updatedFrontmatter = {
          ...currentFrontmatter,
          updatedOn: new Date().toISOString(),
        }
        file.data = updatedFrontmatter
        const updatedFileContent = matter.stringify(file)
        fs.writeFile(path, updatedFileContent)
      }
    }
  })
}

updateFrontmatter()
