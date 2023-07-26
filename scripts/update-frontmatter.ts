/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs").promises
const matter = require("gray-matter")

const CUTOFF_DATE = "2023-07-26"

function convertDateToIST(date) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  )
}

const updateFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv

  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path)
    const { data: currentFrontmatter } = file

    if (currentFrontmatter.status === "published") {
      // TODO: auto add publishedDate as well
      // If published is not present, set it to current time, else ignore
      const publishedDate = new Date(currentFrontmatter.published)
      const cutoffDate = new Date(CUTOFF_DATE)
      if (publishedDate >= cutoffDate) {
        const updatedFrontmatter = {
          ...currentFrontmatter,
          published: convertDateToIST(publishedDate),
          updatedOn: convertDateToIST(new Date().toISOString()),
        }
        file.data = updatedFrontmatter
        const updatedFileContent = matter.stringify(file)
        fs.writeFile(path, updatedFileContent)
      }
    }
  })
}

updateFrontmatter()
