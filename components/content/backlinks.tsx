import { GraphIcon } from "@phosphor-icons/react/dist/ssr"

import { AnimatedBacklinksList } from "@/components/content/animated-backlinks-list"
import { getNoteBacklinks } from "@/lib/content"

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

        <AnimatedBacklinksList links={backlinks || []} />
      </div>
    </div>
  )
}
