import Balancer from "react-wrap-balancer"

import { Heading } from "./heading"

export default function Section({
  level = "h3",
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
      <Heading className="text-foreground mt-12 mb-4" level={level}>
        <Balancer>{title}</Balancer>
        {data && data.length !== 0 && (
          <span className="text-foreground/60 pl-2 text-xs">{data.length}</span>
        )}
      </Heading>

      <div className={className}>{children}</div>
    </>
  )
}
