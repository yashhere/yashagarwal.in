import CustomMDXComponents from "@/components/mdx"
import SectionTitle from "@/components/ui/section-title"
import { MDXContent } from "@content-collections/mdx/react"
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
      <SectionTitle data={null} title={"Recently in life"} />
      <div className="text-lg text-text">
        <p>
          This is a sporadically updated log of what I am currently doing in
          life.
        </p>
      </div>
      <ol className="relative mt-8 border-l border-gray-200">
        {notes.map((note) => {
          return (
            <>
              <li
                key={note.slug}
                className="prose ml-4 pt-24 leading-7 text-text first:pt-8"
              >
                <div className="absolute -left-1.5 mt-1.5 size-3 rounded-full border border-background bg-gray-700/80"></div>
                <time className="mb-1 text-2xl font-semibold leading-none text-gray-900">
                  {moment(note.createdOn).format("MMM DD, YYYY")}
                </time>
                <div className="mt-4 text-base font-semibold leading-none text-gray-500">
                  {" "}
                  Last updated on:{" "}
                  <time className="">
                    {moment(note.updatedOn).format("MMM DD, YYYY")}
                  </time>
                </div>
                <p className="mb-4 text-lg font-light text-text">
                  <MDXContent
                    code={note.mdx}
                    components={CustomMDXComponents}
                  />
                </p>
              </li>
            </>
          )
        })}
      </ol>
    </>
  )
}
