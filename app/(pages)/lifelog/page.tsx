import CustomMDXComponents from "@/components/mdx"
import SectionTitle from "@/components/ui/section-title"
import { allLifeLogs } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import moment from "moment"
import { getMDXComponent } from "next-contentlayer/hooks"

export default function LifeLog() {
  const notes = allLifeLogs
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
          const MdxContent = getMDXComponent(note.body.code)
          return (
            <>
              <li
                key={note.slug}
                className="max-w-2xl lg:max-w-4xl prose ml-4 pt-24 leading-7 text-text first:pt-8"
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
                  <MdxContent components={CustomMDXComponents} />
                </p>
              </li>
            </>
          )
        })}
      </ol>
    </>
  )
}
