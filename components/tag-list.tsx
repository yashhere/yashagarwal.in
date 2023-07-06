import { cn } from "@/lib/utils"
import { FC } from "react"

type TagListProps = {
  tags: string[]
}

const gradients = ["from-purple to-primary", "from-primary to-purple"]

let count = 0

const getNextGradient = () => {
  const g = gradients[count]
  count++
  if (count == gradients.length) count = 0
  return g
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap">
      {tags.map((t) => {
        return (
          <div
            key={t}
            className={cn(
              "transform transition-all",
              "shadow-surface-elevation-high mr-2 mt-2 rounded-xl bg-gradient-to-r p-1",
              getNextGradient(),
            )}
          >
            <div className="h-full justify-between rounded-lg bg-white px-4 py-2">
              <p className="text-sm font-medium">{t}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
