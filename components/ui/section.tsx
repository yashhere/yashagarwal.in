import Balancer from "react-wrap-balancer"

import { Heading } from "./heading"

export default function Section({
  level = "h2",
  title,
  data,
  children,
  className = "",
}: {
  level?: `h${1 | 2 | 3}`
  title: string
  data?: any[] | null
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <Heading className="mt-12 mb-4 text-foreground" level={level}>
        <Balancer>{title}</Balancer>
        {data && data.length !== 0 && (
          <span className="pl-2 text-xs text-foreground/60">{data.length}</span>
        )}
      </Heading>

      <div className={className}>{children}</div>
    </>
  )
}
