import fs from "fs"
import path from "path"
import RSS from "rss"

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const allPosts = loadJSON(
  path.join(process.cwd(), ".contentlayer/generated/Post/_index.json"),
)

const feed = new RSS({
  title: "My Blogs",
  feed_url: "https://yashagarwal.in/rss.xml",
  site_url: "https://yashagarwal.in",
})

allPosts
  .map((post) => ({
    title: post.title,
    description: post.description,
    url: `https://yashagarwal.in/blog/${post.slug}`,
    date: post.published,
  }))
  .forEach((item) => {
    feed.item(item)
  })

const fullFilePath = path.join(process.cwd(), "public", "rss.xml")

// remove the old file
if (fs.existsSync(fullFilePath)) {
  await fs.promises.unlink(fullFilePath)
}

fs.writeFile(fullFilePath, feed.xml({ indent: true }), (err) => {
  if (err) {
    console.log("Error: ", err)
  }
  console.log("RSS feed generation: all good")
})
