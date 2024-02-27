import { ReactNode } from "react"
import { FiPenTool } from "react-icons/fi"

interface Props {
  children?: ReactNode
}

export default function Draft({ children }: Props) {
  return (
    <>
      <div className="mt-16 flex flex-col items-center gap-8 rounded border bg-foreground py-16 text-center shadow-md">
        <div className="">
          <FiPenTool className="size-28 text-tertiary" />
        </div>
        <div className="text-6xl font-semibold text-secondary sm:text-7xl">
          Work in Progress
        </div>
        <div className="mx-auto w-4/5 text-center text-2xl font-medium">
          I am still working on this article. It may be a good idea to come back
          later.
        </div>
      </div>
      <div className="opacity-40">{children}</div>
    </>
  )
}
