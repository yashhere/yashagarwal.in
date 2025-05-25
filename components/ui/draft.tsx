import { ReactNode } from "react"
import { HammerIcon } from "@phosphor-icons/react/dist/ssr"

interface Props {
  children?: ReactNode
}

export default function Draft({ children }: Props) {
  return (
    <>
      <div className="bg-foreground mt-16 flex flex-col items-center gap-8 rounded-sm border py-16 text-center shadow-md">
        <div className="">
          <HammerIcon className="text-foreground-accent size-28" />
        </div>
        <div className="text-secondary text-6xl sm:text-7xl">
          Work in Progress
        </div>
        <div className="mx-auto w-4/5 text-center text-2xl">
          I am still working on this article. It may be a good idea to come back
          later.
        </div>
      </div>
      <div className="opacity-40">{children}</div>
    </>
  )
}
