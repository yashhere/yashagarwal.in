import { Metadata, ResolvingMetadata } from "next"
import { NotesList } from "@/components/all-notes"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"
import { getPreviewNotes } from "@/lib/content"
import GithubSlugger from "github-slugger"

type Props = {
  params: { tag: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const siteUrl: string = siteConfig.url

  return {
    title: `${params.tag} | Yash Agarwal`,
    description: `All notes related to ${params.tag}`,
    authors: {
      name: "Yash Agarwal",
      url: siteUrl,
    },
    keywords: `${params.tag}`,
    creator: "Yash Agarwal",
    alternates: {
      canonical: `${siteConfig.url}/tags/${params.tag}`,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const slugger = new GithubSlugger()
  const previewNotes = await getPreviewNotes()

  const notesWithTag = previewNotes.filter((item) => {
    slugger.reset()
    const tags = item.note.tags
    if (!tags || tags.length == 0) {
      return false
    }
    return tags.map((tag) => slugger.slug(tag)).includes(params.tag)
  })

  // find un-slugified tag name
  const tagName = new Set<string[]>()
  notesWithTag.forEach((item) => {
    const tags = item.note.tags
    if (!tags || tags.length == 0) {
      return
    }

    tags.forEach((tag) => {
      slugger.reset()
      if (slugger.slug(tag) == params.tag) {
        tagName.add(tag)
      }
    })
  })

  if (tagName.size === 0) {
    tagName.add([params.tag])
  }

  return (
    <>
      <section className="pb-8">
        <SectionTitle data={notesWithTag} title={tagName} />
      </section>
      {notesWithTag.length !== 0 ? (
        <NotesList notes={notesWithTag} noSearchBox />
      ) : (
        <p>No notes found for tag {tagName}</p>
      )}
    </>
  )
}
