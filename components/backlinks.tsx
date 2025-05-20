import { getNoteBacklinks } from "@/lib/content"

import Link from "./ui/link"

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
      <hr className="border-t-1 my-4 border-border" />
      <div className="py-8">
        <div className="mb-4 text-2xl font-semibold">
          Pages that link to this
        </div>
        <ul className="list-inside list-disc text-base leading-7">
          {backlinks?.map((link) => {
            return (
              <li key={link.url}>
                <Link href={link.url} noUnderline className="text-primary">
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
