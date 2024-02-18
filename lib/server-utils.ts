import { createHash } from "crypto"
import { headers } from "next/headers"
import { Note } from "contentlayer/generated"

export function sortNotes(array: Note[]) {
  return array.sort(
    (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
  )
}
