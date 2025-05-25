import React from "react"
import { GraphIcon } from "@phosphor-icons/react/dist/ssr"

import { getNoteBacklinks } from "@/lib/content"
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
    <div className="border-border bg-background my-8 rounded-md border p-2.5 text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <GraphIcon className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Backlinks ({backlinks?.length})
          </span>
        </div>

        <div className="border-border space-y-1.5 border-t pt-2">
          {backlinks?.map((link) => (
            <div
              key={link.url}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <Link
                href={link.url}
                className="text-muted-foreground hover:text-primary block text-xs transition-colors"
                variant="nav"
              >
                <span className="text-foreground font-medium">{link.type}</span>
                <span className="ml-1">{link.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
