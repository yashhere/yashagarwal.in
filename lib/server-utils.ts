import { Note } from "content-collections"

export function sortNotes(array: Note[]) {
  return array.sort(
    (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
  )
}
