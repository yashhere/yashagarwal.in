import { allLifelogs } from "content-collections"
import { compareDesc, format } from "date-fns"

import { Mdx } from "@/components/content/mdx"
import Section from "@/components/ui/section"

export default function LifeLog() {
  const notes = allLifelogs
  notes.sort((a, b) => {
    return compareDesc(new Date(a.createdOn), new Date(b.createdOn))
  })

  return (
    <>
      <Section data={null} title={"Recently in life"}>
        <div className="text-foreground text-base">
          <p>
            This is a sporadically updated log of what I am currently doing in
            life.
          </p>
        </div>
      </Section>
      <ol className="border-border/50 relative mt-8 border-l">
        {notes.map((note) => {
          return (
            <li
              key={note.slug}
              className="prose text-foreground ml-4 pt-24 leading-7 first:pt-8"
            >
              <div className="border-background bg-muted-foreground absolute -left-1.5 mt-1.5 size-3 rounded-full border"></div>
              <time className="text-foreground mb-1 text-2xl leading-none">
                {format(new Date(note.createdOn), "MMM dd, yyyy")}
              </time>
              <div className="text-muted-foreground mt-4 text-base leading-none">
                {" "}
                Last updated on:{" "}
                <time className="">
                  {format(
                    new Date(note.updatedOn || note.createdOn),
                    "MMM dd, yyyy"
                  )}
                </time>
              </div>
              <p className="text-foreground mb-4 text-base font-light">
                <Mdx code={note.mdx} />
              </p>
            </li>
          )
        })}
      </ol>
    </>
  )
}
