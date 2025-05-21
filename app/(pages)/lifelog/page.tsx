import { Mdx } from "@/components/content/mdx"
import Section from "@/components/ui/section"
import { allLifelogs } from "content-collections"
import { compareDesc } from "date-fns"
import moment from "moment"

export default function LifeLog() {
  const notes = allLifelogs
  notes.sort((a, b) => {
    return compareDesc(new Date(a.createdOn), new Date(b.createdOn))
  })

  return (
    <>
      <Section data={null} title={"Recently in life"}>
        <div className="text-base text-foreground">
          <p>
            This is a sporadically updated log of what I am currently doing in
            life.
          </p>
        </div>
      </Section>
      <ol className="relative mt-8 border-l border-border/50">
        {notes.map((note) => {
          return (
            <li
              key={note.slug}
              className="prose ml-4 pt-24 leading-7 text-foreground first:pt-8"
            >
              <div className="absolute -left-1.5 mt-1.5 size-3 rounded-full border border-background bg-muted-foreground"></div>
              <time className="mb-1 text-2xl leading-none text-foreground">
                {moment(note.createdOn).format("MMM DD, YYYY")}
              </time>
              <div className="mt-4 text-base leading-none text-muted-foreground">
                {" "}
                Last updated on:{" "}
                <time className="">
                  {moment(note.updatedOn).format("MMM DD, YYYY")}
                </time>
              </div>
              <p className="mb-4 text-base font-light text-foreground">
                <Mdx code={note.mdx} />
              </p>
            </li>
          )
        })}
      </ol>
    </>
  )
}
