import Balancer from "react-wrap-balancer"

export default function SectionTitle({ title, data }) {
  return (
    <h1 className="mb-8 text-2xl font-semibold text-foreground md:text-3xl">
      <Balancer>{title}</Balancer>
      {data && data.length !== 0 && (
        <span className="pl-2 text-xs text-foreground/60">{data.length}</span>
      )}
    </h1>
  )
}
