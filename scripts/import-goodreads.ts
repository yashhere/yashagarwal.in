/**
 * Import books from a Goodreads CSV export into a JSON data file.
 *
 * Usage:
 *   1. Export your Goodreads library: https://www.goodreads.com/review/import
 *   2. Save the CSV as `goodreads-export.csv` in the project root
 *   3. Run: bun scripts/import-goodreads.ts
 *   4. The output is written to `src/content/books/data.json`
 *
 * The importer keeps: title, author, ISBN, ISBN13, rating, date read, bookshelf, and review URL.
 * It skips books without a date read (unless they're on "currently-reading" or "to-read" shelves).
 * Stars are normalized to "want-to-read" (0 stars = want to read on export).
 */

import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

interface GoodreadsRow {
  "Book Id": string
  Title: string
  Author: string
  "Author l-f": string
  "Additional Authors": string
  ISBN: string
  ISBN13: string
  "My Rating": string
  "Average Rating": string
  Publisher: string
  Binding: string
  "Number of Pages": string
  "Year Published": string
  "Original Publication Year": string
  "Date Read": string
  "Date Added": string
  Bookshelves: string
  "Bookshelves with positions": string
  "Exclusive Shelf": string
  "My Review": string
  Spoiler: string
  "Private Notes": string
  "Read Count": string
  "Owned Copies": string
}

interface Book {
  title: string
  author: string
  isbn?: string
  isbn13?: string
  dateRead?: string
  rating?: number
  status: "read" | "reading" | "want-to-read"
  goodreadsUrl?: string
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function parseGoodreadsCsv(csv: string): GoodreadsRow[] {
  const lines = csv.trim().split("\n")
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0])
  const rows: GoodreadsRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ""
    })
    rows.push(row as unknown as GoodreadsRow)
  }

  return rows
}

function toBook(row: GoodreadsRow): Book {
  const shelf = row["Exclusive Shelf"].toLowerCase()
  const status: Book["status"] =
    shelf === "currently-reading"
      ? "reading"
      : shelf === "to-read"
        ? "want-to-read"
        : "read"

  const rating = parseInt(row["My Rating"], 10) || 0
  const dateReadRaw = row["Date Read"]?.trim()
  const dateAddedRaw = row["Date Added"]?.trim()
  // For read books, fall back to Date Added when Date Read is missing
  const dateStr = dateReadRaw || (shelf === "read" ? dateAddedRaw : undefined)
  const dateRead = dateStr
    ? new Date(dateStr).toISOString().split("T")[0]
    : undefined

  return {
    title: row.Title?.trim() || "Unknown Title",
    author: row.Author?.trim() || "Unknown Author",
    isbn: row.ISBN?.trim() || undefined,
    isbn13: row.ISBN13?.trim() || undefined,
    dateRead: dateRead
      ? new Date(dateRead).toISOString().split("T")[0]
      : undefined,
    rating: rating > 0 ? rating : undefined,
    status,
    goodreadsUrl: row["Book Id"]
      ? `https://www.goodreads.com/book/show/${row["Book Id"]}`
      : undefined,
  }
}

const inputPath = resolve(process.cwd(), "goodreads-export.csv")
const outputPath = resolve(process.cwd(), "src/content/books/data.json")

let csv: string
try {
  csv = readFileSync(inputPath, "utf-8")
} catch {
  console.error(
    `No goodreads-export.csv found at ${inputPath}. Export your library from https://www.goodreads.com/review/import first.`,
  )
  process.exit(1)
}

const rows = parseGoodreadsCsv(csv)
const books = rows.map(toBook)

// Sort: read books by date (newest first), then reading, then want-to-read
books.sort((a, b) => {
  const statusOrder = { read: 0, reading: 1, "want-to-read": 2 }
  const statusDiff = statusOrder[a.status] - statusOrder[b.status]
  if (statusDiff !== 0) return statusDiff
  if (a.dateRead && b.dateRead) return b.dateRead.localeCompare(a.dateRead)
  if (a.dateRead) return -1
  if (b.dateRead) return 1
  return 0
})

writeFileSync(outputPath, JSON.stringify(books, null, 2))

const read = books.filter((b) => b.status === "read").length
const reading = books.filter((b) => b.status === "reading").length
const wantToRead = books.filter((b) => b.status === "want-to-read").length

console.log(`Imported ${books.length} books:`)
console.log(`  Read: ${read}`)
console.log(`  Currently reading: ${reading}`)
console.log(`  Want to read: ${wantToRead}`)
console.log(`Written to ${outputPath}`)
