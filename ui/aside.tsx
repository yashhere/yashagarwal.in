import clsx from "clsx"
import React from "react"

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
    <div className="bg-black/10 px-2 py-2 rounded-md mt-2 mb-2">
      {title ? (
        <div className="mb-2 text-base italic text-opacity-100">{title}</div>
      ) : null}
      <div
        className={clsx({
          "text-sm italic text-black/60 [&>span[data-rehype-pretty-code-fragment]]:!text-[11px]":
            styled,
        })}
      >
        {children}
      </div>
    </div>
  )
}
