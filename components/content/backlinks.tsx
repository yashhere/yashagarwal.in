import { getNoteBacklinks } from "@/lib/content"

import { Heading } from "../ui/heading"
import Link from "../ui/link"

export const BackLinks = ({
  backlinks,
}: {
  backlinks?: NonNullable<ReturnType<typeof getNoteBacklinks>>
}) => {
  if (backlinks?.length === 0) {
    return null
  }

  return (
    <>
      <hr className=" border-t-1 border-border" />
      <div className="flex flex-col space-y-4 my-8">
        <Heading level="h2">Pages that link to this</Heading>
        <ul className="list-outside list-disc text-base pl-5 space-y-2">
          {backlinks?.map((link) => {
            return (
              <li key={link.url} className="text-wrap">
                <Link href={link.url} noUnderline className="break-words">
                  <strong>{link.type}</strong>: {link.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
