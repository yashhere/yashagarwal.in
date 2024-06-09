import Balancer from "react-wrap-balancer"

export default function SectionTitle({ title, data }) {
  return (
    <h1 className="mb-8 text-4xl font-semibold">
      <Balancer>{title}</Balancer>
      {data && data.length !== 0 && (
        <span className="pl-2 text-sm text-text/60">{data.length}</span>
      )}
    </h1>
  )
}
