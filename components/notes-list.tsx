import { NotePreview } from "@/components/note-preview"
import { NoteWithMetrics } from "@/types"

export const NoteList = ({ articles }: { articles: NoteWithMetrics[] }) => {
  return (
    <>
      {articles?.map((article) => {
        return <NotePreview key={article.note.slug} article={article} />
      })}
    </>
  )
}
