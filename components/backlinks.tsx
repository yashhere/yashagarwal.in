import { getBacklinks } from "@/lib/content"

import Link from "./ui/link"

export const BackLinks = ({
  backlinks,
}: {
  backlinks?: NonNullable<ReturnType<typeof getBacklinks>>
}) => {
  return (
    <>
      <div className="py-8">
        <div className="mb-4 text-3xl font-semibold">
          Pages that link to this
        </div>
        <ul className="list-inside list-disc text-lg leading-8">
          {backlinks?.map((link) => {
            return (
              <li>
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
