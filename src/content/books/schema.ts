export interface Book {
  title: string
  author: string
  isbn?: string
  coverUrl?: string
  dateRead?: string // ISO date string
  rating?: number // 1-5
  review?: string
  tags?: string[] // e.g., "fiction", "technical", "philosophy"
  status: "read" | "reading" | "want-to-read"
  goodreadsUrl?: string
}
