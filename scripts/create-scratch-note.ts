#!/usr/bin/env bun

/**
 * Create a new scratch note with minimal friction.
 *
 * Usage:
 *   bun scripts/create-scratch-note.ts                    # interactive
 *   bun scripts/create-scratch-note.ts "Title" "Body..."  # non-interactive (for LLM agents)
 */

import fs from "node:fs/promises"
import path from "node:path"

const CONTENT_DIR = "src/content/scratch_notes"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

function dateTimeStr(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(", ", "T") + "+05:30"
}

async function main() {
  const args = process.argv.slice(2)

  let title: string
  let body: string

  if (args.length >= 2) {
    // Non-interactive mode (for LLM agents)
    title = args[0]
    body = args.slice(1).join(" ")
  } else {
    // Interactive mode
    const rl = (await import("node:readline")).createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    title = await new Promise<string>((resolve) => {
      rl.question("Title: ", resolve)
    })

    console.log("Body (type . on a new line to finish):")
    const lines: string[] = []
    for await (const line of rl) {
      if (line === ".") break
      lines.push(line)
    }
    body = lines.join("\n")
    rl.close()
  }

  if (!title.trim()) {
    console.error("Title is required.")
    process.exit(1)
  }

  const slug = slugify(title)
  const date = todayStr()
  const dirName = `${date}-${slug}`

  let finalDirName = dirName
  let counter = 1
  while (await fs.stat(path.join(CONTENT_DIR, finalDirName)).catch(() => null)) {
    finalDirName = `${dirName}-${counter}`
    counter++
  }

  const dirPath = path.join(CONTENT_DIR, finalDirName)
  await fs.mkdir(dirPath, { recursive: true })

  const frontmatter = `---
title: ${JSON.stringify(title)}
createdOn: ${JSON.stringify(dateTimeStr())}
status: published
---

${body}
`

  const filePath = path.join(dirPath, "index.mdx")
  await fs.writeFile(filePath, frontmatter, "utf-8")

  console.log(`Created: ${filePath}`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
