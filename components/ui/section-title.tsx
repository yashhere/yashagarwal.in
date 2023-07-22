export default function SectionTitle({ title, data }) {
  return (
    <h1 className="leading-extra-tight space-x-4 pb-8 font-heading text-5xl font-bold lg:text-[96px]">
      {title}
      {data && data.length !== 0 && (
        <span className="pl-4 text-sm text-secondary sm:text-lg">
          {data.length}
        </span>
      )}
    </h1>
  )
}
