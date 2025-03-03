import React from "react"
import { cn } from "@/lib/utils"

export const Aside = ({
  children,
  position = "left",
  styled = false,
  title,
}: {
  children: React.ReactNode
  position?: "left" | "right"
  styled?: boolean
  title?: string
}) => {
  return (
    <div className="m-2 rounded-md bg-black/10 p-2">
      {title ? (
        <div className="mb-2 text-base italic text-opacity-100">{title}</div>
      ) : null}
      <div
        className={cn({
          "text-sm italic text-black/60 [&>span[data-rehype-pretty-code-fragment]]:text-[11px]!":
            styled,
        })}
      >
        {children}
      </div>
    </div>
  )
}
