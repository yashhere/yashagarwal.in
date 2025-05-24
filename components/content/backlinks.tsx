import React from "react"
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
    <div className="rounded-md border border-border bg-background p-2.5 text-sm">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Backlinks ({backlinks?.length})
        </div>

        <div className="space-y-1.5 pt-2 border-t border-border">
          {backlinks?.map((link) => (
            <div key={link.url} className="line-clamp-2">
              <Link
                href={link.url}
                className="block text-xs text-muted-foreground hover:text-primary transition-colors"
                variant="nav"
              >
                <span className="font-medium text-foreground">{link.type}</span>
                <span className="ml-1">{link.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
