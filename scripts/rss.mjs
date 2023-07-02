import { writeFileSync } from "fs"
import RSS from "rss"
import { allPosts } from "../.contentlayer/generated/index.mjs"

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
